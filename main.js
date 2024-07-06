// DOMの準備ができたら実行。$(document).readyと同義
$(async function(){
    
    // Tableau拡張の初期化処理
    await tableau.extensions.initializeAsync();

/*
    // ダッシュボード情報の取得
    const dashboard = tableau.extensions.dashboardContent.dashboard;

    // ダッシュボードに含まれる全てのワークシートから、データソースの情報を取得
    const dataSourceFetchPromises = [];
    dashboard.worksheets.forEach(worksheet => dataSourceFetchPromises.push(worksheet.getDataSourcesAsync()));
    const fetchResults = await Promise.all(dataSourceFetchPromises);

    // ユニークなデータソースのリストを作成
    const dataSourcesCheck = {};
    const dashboardDataSources = [];
    fetchResults.forEach(dss => {
        dss.forEach(ds => {
            if (!dataSourcesCheck[ds.id]) {
                // 重複はスキップ
                dataSourcesCheck[ds.id] = true;
                dashboardDataSources.push(ds);
            }
        });
    });

    // DOMを操作
    buildDataSourcesTable(dashboardDataSources);
*/
    
    
    // 画面の解像度を表示
    //showResolution();
    
    //ダッシュボードのプロパティ情報を表示
    displayDashboardProperties();
    
    //オブジェクトの位置を更新
    updateDashboardObjectPosition();
});

/*
// データソース名とデータソース更新ボタンを<table>に追加
function buildDataSourcesTable(dataSources) {
    const dataSourcesTable = $("#dataSourcesTable > tbody")[0];
    for (const dataSource of dataSources) {
        // テーブル行の追加
        const newRow = dataSourcesTable.insertRow(dataSourcesTable.rows.length);
        const nameCell = newRow.insertCell(0);
        const refreshCell = newRow.insertCell(1);

        // ボタン要素の作成
        const refreshButton = document.createElement('button');
        refreshButton.innerHTML = ('Refresh Now');
        refreshButton.type = 'button';
        refreshButton.className = 'btn btn-primary';
        refreshButton.addEventListener('click', async () => await dataSource.refreshAsync());

        // 行の中身を定義
        nameCell.innerHTML = dataSource.name;
        refreshCell.appendChild(refreshButton);
    }
}
*/


// 画面解像度を表示する
function showResolution() {
    // 画面の解像度を取得
    var screenWidth = window.screen.width;
    var screenHeight = window.screen.height;

    // 取得した解像度を画面に表示するためのHTML要素を作成
    var resolutionDisplay = document.createElement('div');
    resolutionDisplay.style.position = 'fixed';
    resolutionDisplay.style.top = '10px';
    resolutionDisplay.style.left = '10px';
    resolutionDisplay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    resolutionDisplay.style.color = 'white';
    resolutionDisplay.style.padding = '10px';
    resolutionDisplay.style.borderRadius = '5px';
    resolutionDisplay.style.zIndex = '1000';
    resolutionDisplay.innerHTML = 'Screen Resolution: ' + screenWidth + ' x ' + screenHeight;

    // HTML要素をボディに追加して表示
    document.body.appendChild(resolutionDisplay);
}

/**
 * ダッシュボードのプロパティ情報を取得して表示する関数
 */
function displayDashboardProperties() {
    const dashboard = tableau.extensions.dashboardContent.dashboard;

    // ダッシュボードの基本プロパティを取得
    const dashboardName = dashboard.name;
    const dashboardSize = {
        height: dashboard.size.height,
        width: dashboard.size.width
    };

    // ダッシュボードのシート情報を取得
    let sheetsInfo = [];
    dashboard.worksheets.forEach(function (worksheet) {
        sheetsInfo.push({
            name: worksheet.name,
            type: worksheet.sheetType,
            size: worksheet.size
        });
    });

    // ダッシュボードの情報をコンソールに出力
    console.log('Dashboard Name:', dashboardName);
    console.log('Dashboard Size:', dashboardSize);
    console.log('Sheets Info:', sheetsInfo);

    // ダッシュボードの情報を画面に表示
    document.getElementById('content').innerHTML = `
        <h2>Dashboard Properties</h2>
        <div class="property">
            <strong>Name:</strong> ${dashboardName}
        </div>
        <div class="property">
            <strong>Size:</strong> ${dashboardSize.width} x ${dashboardSize.height}
        </div>
        <h3>Sheets:</h3>
        <ul class="sheets-list">
            ${sheetsInfo.map(sheet => `<li><strong>${sheet.name}</strong> (ID: ${sheet.type}, Width: ${sheet.size.width}, Height: ${sheet.size.height})</li>`).join('')}
        </ul>
    `;
}

/**
 * ダッシュボードシートの位置を更新する関数
 */
function updateSheetPosition() {
    const dashboard = tableau.extensions.dashboardContent.dashboard;

    dashboard.worksheets.forEach(function (worksheet) {
        // 新しい位置とサイズを設定
        const update = {
            size: {
                width: 500,
                height: 500
            }
        };

        // シートの位置とサイズを更新
        worksheet.size = update.size;

        console.log(`Updated position and size of worksheet ${worksheet.name}`);
    });
}