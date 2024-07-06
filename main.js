document.addEventListener('DOMContentLoaded', function () {
    tableau.extensions.initializeAsync().then(function () {
        displayDashboardProperties();
    }).catch(function (err) {
        console.error('Error initializing Tableau extension:', err);
    });
});

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
            isVisible: worksheet.isVisible
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
            ${sheetsInfo.map(sheet => `<li><strong>${sheet.name}</strong> (Type: ${sheet.type}, Visible: ${sheet.isVisible})</li>`).join('')}
        </ul>
    `;
}
