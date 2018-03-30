//библиотека различных регэксп масок

module.exports =  {
    any_word: /[A-z]|[А-я]/g,
    okved: /^[\d.]+$/g,
    okpd: /^[\d.]+$/g,
    inn: /^\d{5,12}$/g,
    date: /^([\d]{2}\.[\d]{2}\.[\d]{4})$/g,
    any_date: /([\d]{2}\.[\d]{2}\.[\d]{4})/g,
    short_date: /([\d]{2}\/[\d]{2}\/[\d]{4})/g,
    digit: /[\d]/g,
    cyrillic_symbol: /[А-я]/g,
    mail: /\S+@\S+\.\S+/g,
    currency_usd: /\$(\d{1,3}(\,\d{3})*|(\d+))(\.\d{2})?/g,
    currency_eur: /\€(\d{1,3}(\,\d{3})*|(\d+))(\.\d{2})?/g,
    currency_any: /[$₽€](\d{1,3}(\,\d{3})*|(\d+))(\.\d{2})/g
};