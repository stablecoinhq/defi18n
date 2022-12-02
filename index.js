const { readFileSync, readdirSync, writeFileSync } = require("fs")
const main = async () => {
    const languages = ["af", "de", "en", "es", "fa", "fr", "ga", "id", "it", "jp", "kr", "pl", "pt-br", "ro", "ru", "tr", "uk", "zh-TW"]
    const defaultLang = "en"
    const files = readdirSync("./" + defaultLang)
    // read default language
    const defaultFileLanguageMap = {}
    for (const file in files) {
        defaultFileLanguageMap[file] = JSON.parse(readFileSync("./" + defaultLang + "/" + file).toString("utf8"))
    }
    // read other languages
    for (const language in languages) {
        for (const file in files) {
            const languageFilePath = "./" + language + "/" + file
            const languageFile = readFileSync(languageFilePath)
            const languageJson = JSON.parse(languageFile.toString("utf8"))
            for (const key of Object.keys(defaultFileLanguageMap[file])) {
                if (!languageJson[key]) {
                    languageJson[key] = defaultFileLanguageMap[file][key]
                }
            }
            writeFileSync(languageFilePath, JSON.stringify(languageJson, null, 2))
        }
    }
}

main().catch((e) => {
    console.error(e)
})