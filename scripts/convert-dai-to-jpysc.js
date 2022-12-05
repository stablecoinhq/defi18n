const { readFileSync, readdirSync, writeFileSync } = require("fs")
const main = async () => {
    const languages = ["af", "de", "en", "es", "fa", "fr", "ga", "id", "it", "jp", "kr", "pl", "pt-br", "ro", "ru", "tr", "uk", "zh-TW"]
    const replaceList = [
        {
            replaceKeys: ["daistats.dai_brewing", "daistats.dai_from_token", "daistats.dai_in_dsr", "daistats.dai_savings_rate", "daistats.dai_surplus_auctions", "daistats.debt_available_heal", "daistats.token_ceiling"],
            replaceRegex: /dai/ig,
            replaceString: "JPYSC"
        },
        {
            replaceKeys: ["daistats.dai_in_dsr", "daistats.pie_in_dsr"],
            replaceRegex: /dsr/ig,
            replaceString: "JSR"
        },
        {
            replaceKeys: ["daistats.annual_mkr_burn_rate"],
            replaceRegex: /mkr/ig,
            replaceString: "YENDAO"
        }
    ]
    const defaultLang = "en"
    const files = readdirSync("./" + defaultLang)
    // read other languages
    for (const language of languages) {
        for (const file of files) {
            const languageFilePath = "./" + language + "/" + file
            const languageFile = readFileSync(languageFilePath)
            const languageJson = JSON.parse(languageFile.toString("utf8"))
            for (const replaceElement of replaceList) {
                for (const key of replaceElement.replaceKeys) {
                    if (languageJson[key]) {
                        languageJson[key] = languageJson[key].replace(replaceElement.replaceRegex, replaceElement.replaceString)
                    }
                }
            }
            writeFileSync(languageFilePath, JSON.stringify(languageJson, null, 2))
        }
    }
}

main().catch((e) => {
    console.error(e)
})