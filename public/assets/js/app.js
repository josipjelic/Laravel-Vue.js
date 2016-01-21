Vue.filter('currencyDisplay', {
    // model -> view
    read: function (val) {
        if (val > 0) {
            return accounting.formatMoney(val, "$", 2, ".", ",");
        }
    },
    // view -> model
    write: function (val, oldVal) {
        return accounting.unformat(val, ",");
    }
});

var el = document.getElementById('sortable');
var sortable = Sortable.create(el);

var vm = new Vue({
    el: '#app',
    data: {
        rows: [
            //initial data
            {qty: 5, description: "Something", price: 55.20, tax: 10},
            {qty: 2, description: "Something else", price: 1255.20, tax:20},
        ],
        grandtotal: 0,
        taxtotal: 0,
        delivery: 40
    },
    computed: {
        total: function () {
            var gt = 0;
            $.each(this.rows, function (i, e) {
                gt += accounting.unformat(e.total, ",");
            });
            return gt;
        },
        taxtotal: function () {
            var tt = 0;
            $.each(this.rows, function (i, e) {
                tt += accounting.unformat(e.tax_amount, ",");
            });
            return tt;
        }
    },
    methods: {
        addRow: function (index) {
            this.rows.splice(index + 1, 0, {});
        },
        removeRow: function (index) {
            this.rows.splice(index, 1);
        },
        getData: function () {
            $.ajax({
                context: this,
                type: "POST",
                data: {
                    rows: this.rows,
                    taxtotal: this.taxtotal,
                    grandtotal: this.grandtotal,
                },
                url: "/api/data"
            });
        }
    }
});
