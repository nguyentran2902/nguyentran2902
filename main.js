var comments = [{
        id: 1,
        user_id: 1,
        content: 'bai hat hay qua a oi'
    },
    {
        id: 2,
        user_id: 2,
        content: 'cam on e'
    },
    {
        id: 3,
        user_id: 1,
        content: 'he he'
    },
    {
        id: 4,
        user_id: 2,
        content: 'ung ho nhe'
    }
];
var Users = [{
        id: 1,
        name: 'Nguyen Tran'
    },
    {
        id: 2,
        name: 'Hoang Hai'
    },

];


function getComments() {
    return new Promise(function(resolve) {
        resolve(comments)
    })
}

function getUserbyIds(userids) {
    return new Promise(function(resolve) {
        var result = Users.filter(function(user) {
            return userids.includes(user.id)
        });
        resolve(result)
    })
}

getComments()
    .then(function(comments) {
        var userids = comments.map(function(comment) {
            return comment.user_id;
        });
        return getUserbyIds(userids)
            .then(function(result) {
                return data = {
                    users: result,
                    comments: comments
                }
            })

        .then(function(data) {
            var cmtBox = document.getElementById('cmtBox');
            html = '';
            data.comments.forEach(function(comment) {
                var user = data.users.find(function(user) {
                    return user.id === comment.user_id
                });
                html += `<li style="color:red" ><a href="">${user.name}</a>: ${comment.content}</li>`
            });
            cmtBox.innerHTML = html;
        })
    });