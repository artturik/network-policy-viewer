const fs = require('fs');
const https = require('https');

async function main(){
    await new Promise(resolve => {
        const file = fs.createWriteStream("swagger-raw.json");
        https.get("https://raw.githubusercontent.com/kubernetes/kubernetes/master/api/openapi-spec/swagger.json", function(response) {
            response.pipe(file);

        });

        file.on('finish', () => {
            resolve();
        })
    })

    const json = JSON.parse(fs.readFileSync('swagger-raw.json'));
    const rawDefinitions = json.definitions;


    function linkedPropertySearch(key, acc){
        console.log(key);
        key = key.replace('#/definitions/', '');
        if(acc.includes(key)){
            return;
        }
        acc.push(key);
        const props = rawDefinitions[key].properties;
        if(!props){
            return;
        }
        const propsKeys = Object.keys(props);
        propsKeys.forEach(propKey => {
            if(props[propKey]['$ref']){
                linkedPropertySearch(props[propKey]['$ref'], acc);
                return;
            }

            if(props[propKey]['items'] && props[propKey]['items']['$ref']){
                linkedPropertySearch(props[propKey]['items']['$ref'], acc)
            }
        });
    }

    const linkedProperties = [];
    linkedPropertySearch('io.k8s.api.networking.v1.NetworkPolicy', linkedProperties);

    const definitions = {};
    linkedProperties.forEach((key) => {
        definitions[key] = rawDefinitions[key];
    });

    const result = {definitions};
    fs.writeFileSync('swagger.json', JSON.stringify(result, null, "\t"));
}
main();

