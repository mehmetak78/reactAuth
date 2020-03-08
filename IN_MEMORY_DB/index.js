
const DB = {
    USER_TABLE :  [
        {
            id:1,
            username: "mehmetak78@hotmail.com",
            password: "$2a$10$9VksmNeABDcAbeKaaomXXOE9LMHVIHBu/5cZaaHLa6mXrsf7NvSN2",
            googleId:"1",
            name:"Mehmet",
        },
    ]
};

const insertDB = (table, row) => {
    const rowWithMaxId = DB[table].reduce((a, b) => {
        if (a.id > b.id) {
            return a;
        }
        return b;
    });
    const newRow = {id: rowWithMaxId.id + 1, ...row};

    DB[table] = [...DB[table], newRow];
    return newRow;
};

const findByColumn = (table, column, value) => {
    return DB[table].find(row => row[column] === value);
};

module.exports = {insertDB, findByColumn};
