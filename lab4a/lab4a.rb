#Your code goes here

import 'org.apache.hadoop.hbase.client.HTable'
import 'org.apache.hadoop.hbase.client.Put'

# Convert Ruby strings to Java byte arrays
def jbytes( *args )
    args.map { |arg| arg.to_s.to_java_bytes }
end

# put_many Function to insert multiple column-value pairs into HBase
def put_many( table_name, row, column_values)
    # Initialize the HTable instance
    table = HTable.new(@hbase.configuration, table_name.to_java_bytes)
    # Create a Put instance for the specified row
    p = Put.new(*jbytes(row.to_java_bytes))

    # Iterate over the column_values
    column_values.each do |key, value|
        # Split the key into column_family and column_qualifier
        split_key = key.split(':')
        column_family = (split_key[0] || "").to_java_bytes
        column_qualifier = (split_key[1] || "").to_java_bytes
        value = value.to_java_bytes
        p.add(column_family, column_qualifier, value)
    end

    # Commit the Put instance to the table
    table.put(p)
    # Close Htable instance to release resources
    table.close()
end

put_many 'wiki','31',{
    "text:" => "Land my first perm position!",
    "revision:author" => "Thanh Nguyen",
    "revision:comment" => "This time for sure!"
}

get 'wiki', '31'



#Do not remove the exit call below
exit
