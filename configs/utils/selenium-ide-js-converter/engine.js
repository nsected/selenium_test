module.exports = (htmlPath,jsPath)=>{

	let actionsOpen = `
	        await (async function () {
            let stepFunction = async function (lastIteration) {
                let iteration = lastIteration | 0;
                try {
                    iteration++;
                    await driver.sleep(cooldown);
	`;
	let actionsClose = `
	                } catch (err) {
                    if (iteration < retry_command_count) {
                    await driver.sleep(retryCommandCooldown);
                    console.log('↻' + step);
                        await stepFunction(iteration)
                    } else {
                    console.log('⚠ error at step ' + step);
                    console.error(err);
                        throw(err)
                    }
                }
            };
            await stepFunction();
        })();
        `;



// Load Dependencies
	const fs = require('fs');

// Load Configs, Template
	const config=require('./config'),
		fileTemplate=require('./jsTemplate'),
		{waitTime}=config;



	function elementExtractor(tag,doc){
		let startTag = `<${tag}>`;
		let stopTag = `</${tag}>`;
		let tagLen = tag.length;
		let elem = [];


		while(doc.indexOf(startTag)!==-1){
			let startPos = doc.indexOf(startTag)+tagLen+2;
			let stopPos = doc.indexOf(stopTag);

			elem.push(doc.slice(startPos,stopPos));
			doc=doc.slice(stopPos+tagLen+3);
		}

		return elem;
	}


	function elementExtractorOrder(tag,doc){
		let docArray = elementExtractor(tag,doc);

		// Error handle---------------------------
		if(docArray.length!==3){
			throw `ERROR: Can't create order object (number of <td> element not equal 3)`;
		}

		let orderObject={
			order:docArray[0],
			selector:docArray[1],
			mis:docArray[2]
		};

		return orderObject;
	}



	function getAllOrder(doc){
		let allOrder = [];

		let tables = elementExtractor('tbody',doc);

		// Error handle---------------------------
		if (tables.length!==1) throw `ERROR: only one <tbody> element accept`;

		tables.forEach(table=>{
			tableEach = elementExtractor('tr',table);
			// Error handle---------------------------
			if (tableEach.length===0) throw `ERROR: need at least one command (<tr> element)`;

			tableEach.forEach(trs=>{
				trsEach=elementExtractorOrder('td',trs);
				allOrder.push(trsEach);
			})
		});

		return allOrder;
	}

	function convertXhtml(text){
		let entityMap = {
			'&amp;':'&',
			'&gt;':'>',
			'&lt;':'<',
			'&quot;':'"',
			'&nbsp;':' '
		};

		for(var e in entityMap){
			text=text.replace(new RegExp(e,'g'),entityMap[e]);
		}

		return text;
	}

	function interpretOrder(order){
		//!
		// use {-selector-},{-mis-}
		let findElementOrder=`await driver.findElement({-selector-})`;
		let mappingOrder={
			'open':'await driver.get(baseUrl+`{-selector-}`);',
			'click':`
					await driver.wait(until.elementLocated({-selector-}),waitCooldown).click();
					 `,
			'clickAndWait':`
					await driver.wait(until.elementLocated({-selector-}),waitCooldown).click();
					`,
            'assertElementPresent':`await driver.wait(until.elementIsVisible(await driver.findElement({-selector-})),waitCooldown);`,

            'storeText':`await driver.wait(until.elementLocated({-selector-}),waitCooldown).then(elem=>{elem.getText().then(text=>{{-mis-} = text})});`,
            'handleText':`await driver.wait(until.elementLocated({-selector-}),waitCooldown).then(elem=>{elem.getText().then(text=>{{-mis-}})});`,
            'waitForElementPresent':`await driver.wait(until.elementLocated({-selector-}),waitCooldown).then(elem=>{elem.getText().then(text=>{last_elem_text = text})});`,
			'waitForCondition':`await driver.wait(until.elementLocated({-selector-}), waitCooldown).then(async el=>{return await driver.wait(until.{-mis-}(el),waitCooldown)});`,
			'waitForTitle':`await driver.wait(until.titleIs({-selector-})),waitCooldown);`,

            'select':`await driver.wait(until.elementLocated({-selector-}),waitCooldown).sendKeys('{-mis-}');`,

			'assertText':`await driver.wait(until.elementLocated({-selector-}),waitCooldown).getText().then(text=>{return assert.ok(text.replace(/<br \\/>/g, '').replace(/\\n/g, '').toUpperCase() == `+'`'+`{-mis-}`+'`'+`.replace(/<br \\/>/g, '').replace(/\\n/g, '').toUpperCase())});`,
            'assertTitle':`await driver.getTitle().then(title=>assert.ok(title == '{-selector-}'));`,
            'assertNotEval':'await driver.wait(until.elementLocated({-selector-}),waitCooldown).then(async elem=>{{-mis-}});',

			'selectFrame':`await driver.switchTo().frame(await driver.wait(until.elementLocated({-selector-}),waitCooldown));`,

            'assertElementNotPresent':`await driver.sleep(cooldown).then(()=>{
			await driver.executeScript(
            "var By={}; " +
            "By.xpath = function (path){ " +
                "return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;" +
            "}; " +
            "By.id = function (path) {" +
                "return document.querySelectorAll('#'+path)" +
            "};" +
            "By.css = function (path) {" +
                "return document.querySelectorAll(path)" +
            "};" +
            "By.name = function (path) {" +
                "return document.getElementsByName(path)" +
            "};" +
            "var elem = {-selector-};" +
            "if(elem.length>0){"+
            "throw new Error"+
            "}else{"+
            "return true"+
            "}"  
        )
        });`,

			'clickAt':`await driver.sleep(cooldown).then(()=>{
			await driver.executeScript(
            "var By={}; " +
            "By.xpath = function (path){ " +
                "return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;" +
            "}; " +
            "By.id = function (path) {" +
                "return document.getElementById(path)" +
            "};" +
            "By.css = function (path) {" +
                "return document.querySelector(path)" +
            "};" +
            "By.name = function (path) {" +
                "return document.getElementsByName(path)[0]" +
            "};" +
            "var elem = {-selector-};" +
            `+"`"+`elem.value = '{-mis-}';`+"`"+`+
            "elem.click();"
        )
        });`,

			'typeAndWait':`
					let inputElement = await driver.wait(until.elementLocated({-selector-}),waitCooldown);
					await inputElement.clear();
            		await inputElement.sendKeys(String.raw`+'`'+`{-mis-}`+'`'+`);
            		let inputText = await inputElement.getAttribute("value");
            		let inputText2 = await inputElement.getText();
            		await assert.ok('{-mis-}' == inputText || '{-mis-}'  == inputText2);
			`,

            'type':`
					let inputElement = await driver.wait(until.elementLocated({-selector-}),waitCooldown);
					await inputElement.clear();
            		await inputElement.sendKeys(String.raw`+'`'+`{-mis-}`+'`'+`);
            		let inputText = await inputElement.getAttribute("value");
            		let inputText2 = await inputElement.getText();
            		await assert.ok('{-mis-}' == inputText || '{-mis-}'  == inputText2);
            		`,

            'focus':'await driver.executeScript("'+
            `var By={}; " +
            "By.xpath = function (path){ " +
                "return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;" +
            "}; " +
            "By.id = function (path) {" +
                "return document.getElementById(path)" +
            "};" +
            "By.css = function (path) {" +
                "return document.querySelector(path)" +
            "};" +
            "By.name = function (path) {" +
                "return document.getElementsByName(path)[0]" +
            "};" +
            "Object.assign(" +
                "{-selector-}" +
                ".style,{display:'block',visibility:'visible',color:'red',fontSize:'1em',opacity:'1'});`+
			'");',

            'sendKeys':'await driver.wait(until.elementLocated({-selector-}),waitCooldown).then(elem=>{elem.sendKeys(Key["{-mis-}"])});',
            'pause':'await driver.sleep({-mis-});',

			'assertExpression':`		
			let elem = await driver.wait(until.elementLocated({-selector-}),waitCooldown);
			let elem_text = await elem.getText();
			let elem_date;
			try{
				elem_date = parse_date(elem_text);
			}catch (e){}
			try{
				 assert.ok({-mis-});
				 console.log('elem_date: ' + elem_date);
				 console.log('current date: ' + new Date);
			}catch (e){
				console.log('elem text: ' + elem_text);
				console.log('elem_date: ' + elem_date);
				console.log('current date: ' + new Date);
				throw(e);
			}
            `,
            
            'verifyText': `await driver.wait(until.elementLocated({-selector-}),waitCooldown).getText().then(text=>{return assert.ok(new RegExp({-mis-}).test(text))});`,


			'//open':' ',
            '//click':' ',
            '//clickAndWait':` `,
            '//assertElementPresent':` `,
            '//storeText':` `,
            '//waitForElementPresent':` `,
            '//waitForCondition':` `,
            '//waitForTitle':` `,
            '//select':` `,
            '//assertText':` `,
            '//assertTitle':` `,
            '//assertNotEval':' ',
            '//selectFrame':` `,
            '//type':` `,
            '//assertElementNotPresent':` ` ,
            '//clickAt':` `,
            '//typeAndWait':` `,
            '//focus':' ',
            '//sendKeys':' ',
            '//pause':' ',
            '//assertExpression':` `,
            '//verifyText': ` `,
            '//handleText': ` `,
            '//': `await console.log('        🛈 {-mis-}');`
};


		if(!mappingOrder[order]) throw `ERROR: order type: '${order}' is not supported`;

		return mappingOrder[order];
	}

	function interpretSelector(selector){
		selector=convertXhtml(selector);
		let template;
		let startPos;

		if(selector.substring(0,4).indexOf('css=')!==-1){
			template='By.css(`{-body-}`)';
			startPos=4;
		}

		if(selector.substring(0,3).indexOf('id=')!==-1){
			template='By.id(`{-body-}`)';
			startPos=3;
		}

		if(selector.substring(0,2).indexOf('//')!==-1){
			template='By.xpath(`{-body-}`)';
			startPos=0;
		}

		if(selector.substring(0,6).indexOf('xpath=')!==-1){
			template='By.xpath(`{-body-}`)';
			startPos=6;
		}

		if(selector.substring(0,5).indexOf('link=')!==-1){
			template='By.xpath("'+"//a[contains(text(),'"+`{-body-}`+"')]"+'")';
			startPos=5;
		}

		if(selector.substring(0,5).indexOf('name=')!==-1){
			template="By.name('{-body-}')";
			startPos=5;
		}


		if(template){
			return template.replace('{-body-}',selector.slice(startPos));
		}

		return selector;
	}

	function interpretMis(mis){
        mis = convertXhtml(mis);
		if(mis.indexOf('label=')!==-1){
			return mis.slice(6);
		}

		return mis;
	}

	function interpretActions(orderObj){
		let {order,selector,mis} = orderObj;
		let action;
		action=interpretOrder(order);
		action=action.replace(/{-selector-}/g,interpretSelector(selector));
		action=action.replace(/{-mis-}/g, interpretMis(mis));

		return action
	}

	function insertActions(fileTemplate,testHtml){
		allOrders=getAllOrder(testHtml);
		let actions='';
		let i = 0;
		allOrders.forEach(order=>{
			i++;
            if (
                order.order === 'waitForElementPresent'
            ){
                actions+="				await driver.sleep(0).then(()=>{" +
                    "\n						step = "+ '`'+i+
                    "\n						command: "+order.order +
                    "\n						target: "+ convertXhtml(order.selector)+
                    '\n' +
                    '						value: '+convertXhtml(order.mis).replace(/`/g,'"').replace(/\$/g,'\\$').replace(/\\d/g,'d')+'`;' +
                    "\n						allure.createStep(step,()=>{})();" +
                    "\n						});" +
                    "\n";
                actions+='\n        			await driver.wait(until.elementLocated('+interpretSelector(order.selector)+'), waitCooldown);';
                actions+='\n        			element = await driver.wait(until.elementLocated('+interpretSelector(order.selector)+'), waitCooldown).then(el=>{return driver.wait(until.elementIsEnabled(el),waitCooldown)});';
                textOrder=interpretActions(order)+'';
                actions+= '\n		'+textOrder;
            }
            actions+=actionsOpen;
			actions+="				await driver.sleep(0).then(()=>{" +

				"\n						step = "+ '`'+i+
				"\n						command: "+order.order +
				"\n						target: "+ convertXhtml(order.selector)+
				'\n' +
				'						value: '+convertXhtml(order.mis).replace(/`/g,'"').replace(/\$/g,'\\$').replace(/\\d/g,'d')+'`;' +

				"\n						allure.createStep(step,()=>{})();" +
				"\n						});" +
				"\n";
			if (order.order === 'click' ||
				order.order === 'clickAndWait' ||
				order.order === 'type' ||
				order.order === 'select' ||
				order.order === 'typeAndWait'
			){
				actions+='\n        			await driver.wait(until.elementLocated('+interpretSelector(order.selector)+'), waitCooldown);';
				actions+='\n        			element = await driver.wait(until.elementLocated('+interpretSelector(order.selector)+'), waitCooldown).then(el=>{return driver.wait(until.elementIsEnabled(el),waitCooldown)});';
				actions+='\n 					await driver.executeScript(scrollElementIntoMiddle, element);';
			}
            if (
                order.order === 'assertText'
            ){
                actions+='\n        			await driver.wait(until.elementLocated('+interpretSelector(order.selector)+'), waitCooldown);';
                actions+='\n        			element = await driver.wait(until.elementLocated('+interpretSelector(order.selector)+'), waitCooldown).then(el=>{return driver.wait(until.elementIsEnabled(el),waitCooldown)});';
			}
			actions+='\n        			await driver.sleep(inCommandCooldown);';
			textOrder=interpretActions(order)+'';
			actions+= '\n		'+textOrder;
			actions+= actionsClose;
		});

		if (fileTemplate.indexOf('{-actions-}') === -1) throw `ERROR: there should be '{-action-}' in jsTemplate.js file for order injection`;

		return fileTemplate.replace('{-actions-}',actions);
	}

	function writeFile(dirnameJs,filename,testHtml){
		console.log(filename);
		fs.writeFile(dirnameJs+filename+'.js',insertActions(fileTemplate,testHtml),err=>{
			if (err) throw err;
			console.log('Created '+filename+'.js already');
		})
	}


	function readFiles(dirnameHtml,dirnameJs,onFileContent) {
		fs.readdir(dirnameHtml, (err, filenames)=>{
			if (err) throw err;
			filenames.forEach(filename=>{
				fs.readFile(dirnameHtml + filename, 'utf-8',(err, testHtml)=>{
					if (err) throw err;
					onFileContent(dirnameJs,filename,testHtml);
				});
			});
		});
	}


// Init
	function init(dirnameHtml,dirnameJs){
		readFiles(dirnameHtml,dirnameJs,writeFile);
	}

	init(`./${htmlPath}/`,`./${jsPath}/`);

};