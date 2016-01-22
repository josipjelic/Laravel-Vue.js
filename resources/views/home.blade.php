@extends('layouts.app')

@section('content')
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-10 col-md-offset-1">
                <div class="panel panel-default">
                    <div class="panel-heading">Dashboard</div>

                    <div class="panel-body">
                        You are logged in!
                    </div>
                    <div class="panel-body" id="app">
                        <table class="table table-hover">
                            <thead>
                            <tr>
                                <th style="width: 20px;">No.</th>
                                <th>Description</th>
                                <th style="width: 80px;">Qty</th>
                                <th style="width: 130px;" class="text-right">Price</th>
                                <th style="width: 90px;">Tax</th>
                                <th style="width: 130px;">Total</th>
                                <th style="width: 130px;"></th>
                            </tr>
                            </thead>
                            <tbody v-sortable.tr="rows">
                            <tr v-for="row in rows" track-by="$index">
                                <td>
                                    @{{ $index +1 }}
                                </td>
                                <td>
                                    <input class="form-control" v-model="row.description"/>
                                </td>
                                <td>
                                    <input class="form-control" v-model="row.qty" number/>
                                </td>
                                <td>
                                    <input class="form-control text-right" v-model="row.price | currencyDisplay" number data-type="currency"/>
                                </td>
                                <td>
                                    <select class="form-control" v-model="row.tax">
                                        <option value="0">0%</option>
                                        <option value="10">10%</option>
                                        <option value="20">20%</option>
                                    </select>
                                </td>
                                <td>
                                    <input class="form-control text-right" :value="row.qty * row.price | currencyDisplay" v-model="row.total | currencyDisplay" number readonly />
                                    <input type="hidden" :value="row.qty * row.price * row.tax / 100" v-model="row.tax_amount | currencyDisplay" number/>
                                </td>
                                <td>
                                    <button class="btn btn-primary btn-xs" @click="addRow($index)">add row</button>
                                    <button class="btn btn-danger btn-xs" @click="removeRow($index)">remove row</button>
                                </td>
                            </tr>
                            </tbody>
                            <tfoot>

                            <tr>
                                <td colspan="5" class="text-right">TAX</td>
                                <td colspan="1" class="text-right">@{{ taxtotal | currencyDisplay }}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colspan="5" class="text-right">TOTAL</td>
                                <td colspan="1" class="text-right">@{{ total | currencyDisplay }}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colspan="5" class="text-right">DELIVERY</td>
                                <td colspan="1" class="text-right"><input class="form-control text-right" v-model="delivery | currencyDisplay" number/></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colspan="5" class="text-right"><strong>GRANDTOTAL</strong></td>
                                <td colspan="1" class="text-right"><strong>@{{ grandtotal = total + delivery | currencyDisplay }}</strong></td>
                                <td></td>
                            </tr>
                            </tfoot>
                        </table>
                        <button @click="getData()">SUBMIT DATA</button>
                        <pre>@{{ $data | json }}</pre>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
