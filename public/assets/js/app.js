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

Vue.directive('sortable', {
    bind: function () {
        var self = this;

        var options = {
            draggable: Object.keys(this.modifiers)[0]
        };

        this.sortable = Sortable.create(this.el, options);
        console.log('sortable bound!')

        this.sortable.option("onUpdate", function (e) {
            self.value.splice(e.newIndex, 0, self.value.splice(e.oldIndex, 1)[0]);
        });

        this.onUpdate = function(value) {
            self.value = value;
        }
    },
    update: function (value) {
        this.onUpdate(value);
    },
    unbind : function() {
        this.sortable.destroy();
    }
});

var vm = new Vue({
    el: '#app',
    data: {
        rows: [
            //initial data
            {qty: 5, description: "Something", price: 55.20, tax: 10},
            {qty: 2, description: "Something else", price: 1255.20, tax: 20},
        ],
        total: 0,
        grandtotal: 0,
        taxtotal: 0,
        delivery: 40
    },
    computed: {
        total: function () {
            var t = 0;
            $.each(this.rows, function (i, e) {
                t += accounting.unformat(e.total, ",");
            });
            return t;
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
            try {
                this.rows.splice(index + 1, 0, {});
            } catch(e)
            {
                console.log(e);
            }
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
                    total: this.total,
                    delivery: this.delivery,
                    taxtotal: this.taxtotal,
                    grandtotal: this.grandtotal,
                },
                url: "/api/data"
            });
        }
    }
});
