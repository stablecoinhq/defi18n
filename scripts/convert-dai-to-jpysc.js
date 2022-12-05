const { readFileSync, readdirSync, writeFileSync } = require("fs")
const main = async () => {
    const languages = ["af", "de", "en", "es", "fa", "fr", "ga", "id", "it", "jp", "kr", "pl", "pt-br", "ro", "ru", "tr", "uk", "zh-TW"]
    const relace_keys = ["daistats.dai_brewing", "daistats.dai_from_token", "daistats.dai_in_dsr", "daistats.dai_savings_rate", "daistats.dai_surplus_auctions", "daistats.debt_available_heal", "daistats.token_ceiling"]
    const defaultLang = "en"
    const files = readdirSync("./" + defaultLang)
    // read other languages
    for (const language of languages) {
        for (const file of files) {
            const languageFilePath = "./" + language + "/" + file
            const languageFile = readFileSync(languageFilePath)
            const languageJson = JSON.parse(languageFile.toString("utf8"))
            for (const key of relace_keys) {
                if (!languageJson[key]) {
                    languageJson[key] = languageJson[key].replace(/dai/ig, "JPYSC")
                }
            }
            writeFileSync(languageFilePath, JSON.stringify(languageJson, null, 2))
        }
    }
}

main().catch((e) => {
    console.error(e)
})