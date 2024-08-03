// Connect to MongoDB and use the "blogger" database
use blogger


// Create 3 users. 'users' collection is auto created after insert
db.users.insertMany([
    {
        _id: ObjectId("5bb26043708926e438db6cad"),
        name: "Don",
        email: "don@example.com"
    },
    {
        _id: ObjectId("5bb26043708926e438db6cae"),
        name: "Jon",
        email: "jon@example.com"
    },
    {
        _id: ObjectId("5bb26043708926e438db6caf"),
        name: "Bon",
        email: "bon@example.com"
    }
])

// List the contents of the users collection in pretty form
db.users.find().pretty()

// Search for user with _id 5bb26043708926e438db6cad
db.users.find({ "_id": ObjectId("5bb26043708926e438db6cad") })



// 3. Create 3 blogs. 'blogs' collection is auto created after insert
db.blogs.insertMany([
    {
        title: "First",
        body: "First body, with framework",
        slug: "First slug",
        author: ObjectId("5bb26043708926e438db6cad"),
        comments: [
            {
                user_id: ObjectId("5bb26043708926e438db6cae"),
                comment: "First comment2",
                approved: true,
                created_at: new Date()
            }
        ],
        category: [
            { name: "Drama" }
        ]
    },
    {
        title: "Second",
        body: "Second body",
        slug: "Second slug",
        author: ObjectId("5bb26043708926e438db6cae"),
        comments: [
            {
                user_id: ObjectId("5bb26043708926e438db6cad"),
                comment: "Second comment1",
                approved: true,
                created_at: new Date()
            },
            {
                user_id: ObjectId("5bb26043708926e438db6caf"),
                comment: "Second comment2",
                approved: true,
                created_at: new Date()
            }
        ],
        category: [
            { name: "Comedy" }
        ]
    },
    {
        title: "Third",
        body: "Third body",
        slug: "Third slug",
        author: ObjectId("5bb26043708926e438db6caf"),
        comments: [
            {
                user_id: ObjectId("5bb26043708926e438db6cae"),
                comment: "Third comment1",
                approved: true,
                created_at: new Date()
            }
        ],
        category: [
            { name: "Horror" }
        ]
    }
])

// Get all comments by User 5bb26043708926e438db6caf across all posts displaying only the title and slug
db.blogs.find(
    {'comments.user_id':ObjectId("5bb26043708926e438db6caf")},
    {_id:0, title:1, slug:1}
)

// Select a blog via a case-insensitive regular expression containing the word "framework" in the body displaying only the title and body
db.blogs.find(
    {body: /framework/},
    {_id:0, title:1, body:1}
)
