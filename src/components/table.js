import BootstrapTable from 'react-bootstrap-table-next';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import paginationFactory, {PaginationProvider, PaginationTotalStandalone, PaginationListStandalone} from 'react-bootstrap-table2-paginator';
import cellEditFactory ,{Type} from 'react-bootstrap-table2-editor'
import filterFactory, {textFilter}  from 'react-bootstrap-table2-filter'
import {Modal, Button} from "react-bootstrap"
import ToolkitProvider, {CSVExport} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

const { ExportCSVButton } = CSVExport;
function BTable() {
    const[ data, setData] = useState([])
    const [modalInfo, setModalInfo] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [show, setShow] = useState(false)
    const [viewId, setViewId] = useState(null)
    
    const handleClose = () => setShow(false)
    const handleShow = () => {
        setShow(true)
        
    }
  

    useEffect(() => {
        getData()
    },[])

    const getData = () => {
        axios("https://jsonplaceholder.typicode.com/comments")
        .then(res => setData(res.data))
    }

    const rowEvents = {
        onClick : (e,row) => {
            setModalInfo(row);
            toggleTrueFalse()
        }
    }

    const toggleTrueFalse = () => {
        setModalInfo(prevModal => data.map(item => {
            return item.body
        }));
        setShowModal(handleShow)
    }
   
    const ModalContent = () => {
        return (
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Body Info
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* {modalInfo.forEach(item => {
                        return item
                    })} */}
                    {modalInfo}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='second' onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }


    const options = {
        totalSize : data.length,
        custom : true,
    }
    const selectRows= {
        mode: 'checkbox',
        clickToSelect : false,
        hideSelectAll: false,
        selectColumnStyle : { cursor: 'pointer'},
    }

    const emailFormatter = (cell,row) => {
        return <span>
            <b>{cell}</b>
        </span>
    }
    const customTotal = (from, to, size) => (
        <span className="react-bootstrap-table-pagination-total">
        Showing { from } to { to } of { size } Results
        </span>
    );
    const sizePerPageList = [
        { text: '10', value: 10 },
        { text: '20', value: 20 },
        { text: '50', value: 50 },

    ];

    const headerSortingStyle  = {
        backgroundColor: '#bee6fd',
        color: '#black',
       
    }
    
    

  const columns = [
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
      headerSortingStyle ,
      filter: textFilter(),
      formatter: (cell, row) => {
        return (
            <div>
                <button
                onClick = {() => {
                    toggleTrueFalse();
                    setViewId(row.id);
                }}>
                    {cell}
                </button>
                
            </div>
        )
      }
    

    },
    {
      dataField : 'name',
      text : 'Name',
      sort: true,
      headerSortingStyle,
      filter: textFilter(),
    },
    {
      dataField : 'email',
      text : 'Email',
      sort: true,
      headerSortingStyle,
      filter: textFilter(),
      
    },
  ]
    return (
        <PaginationProvider pagination={paginationFactory(options)}>
            {
                ({
                    paginationProps,
                    paginationTableProps
                }) => {
                    return (
                    <div>
                        <div className="pagination">
                            <PaginationTotalStandalone {...paginationProps} />
                            <PaginationListStandalone {...paginationProps} />
                        </div>
                            <ToolkitProvider
                                    keyField='id'
                                    data = {data}
                                    columns = {columns}
                                    exportCSV= {{
                                        noAutoBOM: false,
                                        fileName: `export.csv`,
                                        blobType: 'charset=UTF-8',
                                        onlyExportSelection: true,
                                        exportAll: true
                                    }}
                                    bootstrap4
                                    columnToggle>
                                {(propsToolkit) => {
                                    return (
                                    <div>
                                    <h1>Export all the selected rows</h1>
                                    <ExportCSVButton { ...propsToolkit.csvProps }>Export CSV!!</ExportCSVButton>
                                    <hr />
                                        <BootstrapTable
                                        {...propsToolkit.baseProps}
                                        { ...paginationTableProps }
                                        bootstrap4
                                        filter={ filterFactory()}
                                        
                                        selectRow = {selectRows}
                                        >
                                        </BootstrapTable>
                                        {show ? <ModalContent /> : null}
                                    </div>
                                    )
                                } }
                            </ToolkitProvider>  
                    </div>
                    )
                }
            }
        </PaginationProvider>
        
    );
    
}

export default BTable;



 


                    // <BootstrapTable
                    //             { ...paginationTableProps }
                    //             keyField='id'
                    //             data = {data}
                    //             columns = {columns}
                    //             filter={ filterFactory()}
                    //             rowEvents ={rowEvents}
                    //             selectRow = {selectRows}
                    //             >
                    //             {show ? <ModalContent/> : null}
                    //     </BootstrapTable>