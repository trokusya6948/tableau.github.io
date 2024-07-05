// DOMの準備ができたら実行。$(document).readyと同義
$(async function(){
    // Tableau拡張の初期化処理
    await tableau.extensions.initializeAsync();

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
    
    // 画面の解像度を表示
    showResolution();
});

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