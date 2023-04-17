exports.getFilters = (reqQuery) => {
    console.log(`enter ${reqQuery} queryFilter `);
    let queryFilter = {
        filter: {
        },
        opts: {}
    }    
    if (reqQuery['startDate'] || reqQuery['endDate']) queryFilter.filter['date'] = {}
    
    Object.keys(reqQuery).forEach(( queryProp) => {
        if( !queryProp.includes('Date') && !queryProp.includes('limit') && reqQuery[queryProp] !== "todas") {
            queryFilter.filter[queryProp] = reqQuery[queryProp]
        }
        if(queryProp.includes('Date')){
            queryFilter.filter['date'][queryProp.includes('start') ? `$gt` : `$lt`]  = reqQuery[queryProp]
        }
        if(queryProp.includes('limit')){
            queryFilter.opts.limit =  reqQuery[queryProp]
        }
    })

    console.log(queryFilter);
    return queryFilter
}