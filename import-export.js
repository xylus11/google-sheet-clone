function exportData() {
    let fileData = JSON.stringify(state);
    let blob = new Blob([fileData], { type: "application/json" })
    let url = URL.createObjectURL(blob);
    // <a href="fileaddress" download="sheet.json"></a>
    let link = document.createElement("a");
    link.href = url;
    link.download = "sheet.json";
    link.click();
}
let openBtn = document.querySelector(".open");
openBtn.addEventListener("click",(e)=>{
    let input = document.createElement("input");
    input.setAttribute("type","file");
    input.click();

    input.addEventListener("change",(e)=>{
        let fr = new FileReader();
        let files = input.files;
        let fileObj = files[0];

        fr.readAsText(fileObj);
        fr.addEventListener("load",(e)=>{
            let readSheetData = JSON.parse(fr.result);

            // Baisc Sheet Created
            addSheetBtn.click();

            sheetDB = readSheetData[0];
            graphComponentMatrix = readSheetData[1];
            collectedSheetDB[collectedSheetDB.length-1] = sheetDB;
            collectedGraphComponent[collectedGraphComponent.length-1] = graphComponentMatrix;

            handleSheetProperties();
        });
    });
});