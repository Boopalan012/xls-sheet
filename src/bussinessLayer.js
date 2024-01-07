    const XLSX = require('xlsx');
    const path = require('path');

    const EXCEL_FILE_PATH = path.join(  'file/users.xls');

    exports.getAllRows=()=>{
        const workbook = XLSX.readFile(EXCEL_FILE_PATH);
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        console.log("rows",rows);
        let headers=rows[0];
        const allRows = rows.slice(1).map(row => {
            const rowObject = {};
            headers.forEach((header, index) => {
                rowObject[header] = row[index];
            });
            return rowObject;
        });
        allRows.map(itm=>{
            console.log("check",itm);
        })
        return allRows;
    }
    exports.searchByName = (name) => {
        const workbook = XLSX.readFile(EXCEL_FILE_PATH);
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    
        const headers = rows[0];
        const matchingData = rows
            .slice(1)
            .filter(row => row.length > 0 && row.some(cell => {
                if (typeof cell === 'string' && cell.toLowerCase().includes(name.toLowerCase())) {
                    return true;
                }
                if (typeof cell === 'number' && cell.toString().includes(name.toLowerCase())) {
                    return true;
                }
                return false;
            }))
            .map(row => {
                const rowObject = {};
                headers.forEach((header, index) => {
                    rowObject[header] = row[index];
                });
                return rowObject;
            });
    
        console.log("matching data", matchingData);
    
        return matchingData;
    };
    

    // exports.searchByName1=(firstName)=> {
    //     console.log("firstname", firstName);
    //     const workbook = XLSX.readFile(EXCEL_FILE_PATH);
    //     const sheet = workbook.Sheets[workbook.SheetNames[0]];

    //     const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    //     console.log("rows", rows);
    //     const matchingData = rows
    //         .slice(1)
    //         .filter(row => row.length > 0 && row[1].toLowerCase() === firstName.toLowerCase())
    //         .map(row => ({
    //             firstName: row[1],
    //             lastName: row[2] || '',
    //             gender: row[3] || '',
    //             country: row[4] || '',
    //             age: row[5] || '',
    //         }));
    //     console.log("matching users", matchingData);

    //     return matchingUsers;
    // }