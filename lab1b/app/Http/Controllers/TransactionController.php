<?php

namespace App\Http\Controllers;

use App\Transaction;
use App\Inventory;
use App\Status;
use App\User;

use Illuminate\Http\Request;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
    $inventories = Inventory::all();

    // dd($inventories);

    $statuses = Status::all();

    // dd($statuses);

    $users = User::all();

    $transactions = Transaction::all();

    /** 
     * select t.user_id, i.description, s.description, t.checkout_time from inventory i
     * join transactions t On t.inventory_id=i.id
     * Join status s on i.status_id=s.id
     * where t.user_id=1 AND s.id=5; */
    // Using Eloquent ORM to perform query above - to get all items checked out by user1
    $results1 = Transaction::with(['inventory.status'])
        ->where('user_id', 1)
        ->whereHas('inventory.status', function ($query) {
        $query->where('id', 5);
    })
    ->get();

    /** 
     * SELECT u.first_name, u.last_name, i.description, s.description, t.checkout_time
     * FROM transactions t
     * JOIN users u ON t.user_id=u.id
     * JOIN inventory i ON t.inventory_id=i.id
     * JOIN status s ON i.status_id=s.id
     * WHERE t.checkout_time < 2022-11-01; */
    // Using Eloquent ORM to perform query above - to get all users who checked out items before September 3 2021
    $results2 = Transaction::with(['user', 'inventory.status'])
        ->where('checkout_time', '<', '2021-09-03')
        ->get();

	return view('transaction.index')->with('inventories', $inventories)->with('statuses', $statuses)->with('users',$users)->with('transactions',$transactions)->with('results1',$results1)->with('results2',$results2);
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Transaction  $transaction
     * @return \Illuminate\Http\Response
     */
    public function show(Transaction $transaction)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Transaction  $transaction
     * @return \Illuminate\Http\Response
     */
    public function edit(Transaction $transaction)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Transaction  $transaction
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Transaction $transaction)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Transaction  $transaction
     * @return \Illuminate\Http\Response
     */
    public function destroy(Transaction $transaction)
    {
        //
    }
}
