import BTable from "./table";

import  {textFilter}  from 'react-bootstrap-table2-filter'
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { Button } from 'antd';


  function BoostrapTable() {
    const[ dataValue, setDataValue] = useState([])
    const [show, setShow] = useState(false)
    const [viewId, setViewId] = useState(null)
    
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    

    useEffect(() => {
       (async () => {
        try {
            await axios("https://jsonplaceholder.typicode.com/comments")
            .then(res => setDataValue(res.data))
        } catch (error) {
            console.log(error.message);
        }
       })()
    },[])

    
    
    
    const selectRows= {
        mode: 'checkbox',
        clickToSelect : false,
        hideSelectAll: false,
        selectColumnStyle : { cursor: 'pointer'},
    }

 

    const sizePerPageList = [
        { text: '10', value: 10 },
        { text: '20', value: 20 },
        { text: '50', value: 50 },
        { text: '100', value: 100 },

    ];

    const headerSortingStyle  = {
        backgroundColor: '#bee6fd',
        color: '#black',
       
    }


    const toggleTrueFalse = () => {
        handleShow()
    }

    let columns = [
        {
          dataField : 'id',
          text : 'ID',
          sort: true,
          hidden : true
        },
        {
          dataField : 'postId',
          text : 'PostId',
          sort: true,
          headerStyle : {
            backgroundColor : '#edeae7',
            fontWeight : 500,
            color : '#2e2e2e'
          },
          headerSortingStyle ,
          editable : false,
          filter: textFilter(),
          formatter: (cell, row) => {
            return (
                <Button
                    type="link"
                    onClick = {() => {
                        toggleTrueFalse();
                        setViewId(row.id);
                    }}>
                        {cell}
                </Button> 
                
            )
          }
        },
        {
          dataField : 'name',
          text : 'Name',
          sort: true,
          style: {
            textAlign: 'center'
          },
          headerStyle : {
            textAlign: 'center',
            fontWeight: 700,
            color: '#9b1f0d' ,
            backgroundColor : '#edeae7'
          },
          editable : false,
          headerSortingStyle,
          filter: textFilter(),
        },
        {
          dataField : 'email',
          text : 'Email',
          sort: true,
          style: {
            
            textAlign: 'center'
          },
          headerStyle : {
            textAlign: 'center',
            fontWeight : 700,
            color : '#9b1f0d',
            backgroundColor : '#edeae7'
          },
          editable : false,
          headerSortingStyle,
          filter: textFilter(),
          
        },
      ]


    return ( 
        <div>
            <BTable 
            columns ={columns} 
            data ={dataValue} 
            sizePerPageList = {sizePerPageList} 
            show = {show} 
            handleClose ={handleClose}
            selectRows = {selectRows} 
            viewId = {viewId}
            ></BTable>
        </div>
     );
  }
  
  export default BoostrapTable;