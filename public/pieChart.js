var dataSource = {
    datasets: [
        {
            data: [30, 350, 90],
            backgroundColor: [
                '#ffcd56',
                '#ff6384',
                '#36a2eb',
                '#fd6b19',
                '#c6381a',
                '#bec61a',
                '#1a2fc6',
                '#c61ab1',
            ],
        }
    ],
    labels: [
        'Eat out',
        'Rent',
        'Groceries'
    ]

};

function createChart() {
    var ctx = document.getElementById("myChart").getContext("2d");
    var myPieChart = new Chart(ctx, {
        type: 'pie',
        data: dataSource
    });
}

function getBudget() {
    axios.get('http://localhost:3000/budget')
    .then(function (res) {
        console.log(res);
        for (var i = 0; i < res.data.myBudget.length; i++) {
            dataSource.datasets[0].data[i] = res.data.myBudget[i].value;
            dataSource.labels[i] = res.data.myBudget[i].label;
        }
        createChart();
    });
}
getBudget();