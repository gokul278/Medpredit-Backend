export const  UpdateQueryGenerater = (getdata:any, getstringData:any, tablename:string, updateid:any)=>{
    const data = getdata;

    const stringData = getstringData;
  
      let queryValue = "";
      let count = 1;
      let values = [];
  
      stringData.forEach((element, index) => {
          if (data[index]) {
            // Add the field and placeholder to the query
            if (queryValue.length > 0) {
              queryValue += `, ${element} = $${count}`; // Add a comma for multiple fields
            } else {
              queryValue += `${element} = $${count}`;
            }
    
            // Push the value corresponding to the field
            values.push(data[index]);
            count++;
          }
        });
  
      values.push(updateid);
  
  
  
      // UPDATE user_details SET username = $1 WHERE id = $2;
  
      const query = `UPDATE ${tablename} SET ${queryValue} WHERE id=$${count}`;

      return {
        query:query,
        values:values
      }
}