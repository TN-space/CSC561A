<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>CSC561 | Lab1c</title>
  </head>
<body>

<h3>Status of all of our inventory items - (Inventory -> { belongsTo } -> Status)</h3>

<table border="1">
				<thead>
          <th>Inventory Item</th>
					<th>Description</th>
				</thead>

				<tbody>
					@foreach ($inventories as $inventory)
            <tr>
              <td>{{ $inventory->description }}</td>
							<td>{{ $inventory->status->description }}</td>
            </tr>
          @endforeach

        </tbody>
</table> 

<h3>Inventory Items that have a status of Checked Out - (Status -> { hasMany } -> Inventory)</h3>

<table border="1">
				<thead>
          <th>Inventory Item</th>
					<th>Description</th>
				</thead>

				<tbody>
					@foreach ($statuses->where('description', 'Checked out')->first()->inventory as $checked_out_inventory)
            <tr>
              <td>{{ $checked_out_inventory->description }}</td>
							<td>{{ $checked_out_inventory->status->description }}</td>
            </tr>
          @endforeach

        </tbody>
</table> 

<h3>List of User - (User -> { hasMany } -> Transaction)</h3>
<table border="1">
				<thead>
          <th>First Name</th>
					<th>Last Name</th>
				</thead>

				<tbody>
					@foreach ($users as $user)
            <tr>
              <td>{{ $user->first_name }}</td>
							<td>{{ $user->last_name }}</td>
            </tr>
          @endforeach

        </tbody>
</table> 

<h3>1. All transactions that user1 checked out - (Transaction -> { belongsTo } -> User)</h3>
<table border="1">
				<thead>
          <th>User ID</th>
					<th>Item Description</th>
          <th>Status Description</th>
          <th>Checkout Time</th>
				</thead>

				<tbody>
					@foreach ($results1 as $result)
            <tr>
              <td>{{ $result->user_id }}</td>
							<td>{{ $result->inventory->description }}</td>
              <td>{{ $result->inventory->status->description }}</td>
              <td>{{ $result->checkout_time }}</td>
            </tr>
          @endforeach
        </tbody>
</table> 

<h3>2. All users who checked out items before September 3 2021 - (User -> { hasMany } -> Transaction)</h3>
<table border="1">
				<thead>
          <th>First Name</th>
					<th>Last Name</th>
          <th>Item Description</th>
          <th>Status Description</th>
          <th>Checkout Time</th>
				</thead>

				<tbody>
					@foreach ($results2 as $result)
            <tr>
              <td>{{ $result->user->first_name }}</td>
              <td>{{ $result->user->last_name }}</td>
							<td>{{ $result->inventory->description }}</td>
              <td>{{ $result->inventory->status->description }}</td>
              <td>{{ $result->checkout_time }}</td>
            </tr>
          @endforeach
        </tbody>
</table> 

</body>
</html>
