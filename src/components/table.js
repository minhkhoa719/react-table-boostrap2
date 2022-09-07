import BootstrapTable from 'react-bootstrap-table-next';

import paginationFactory, {PaginationProvider, PaginationListStandalone} from 'react-bootstrap-table2-paginator';
import cellEditFactory  from 'react-bootstrap-table2-editor'
import filterFactory  from 'react-bootstrap-table2-filter'

import ToolkitProvider, {CSVExport} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import ModalContent from './Modal/index'
import PaginationToolBar from './Pagination/PaginationToolBar';

const { ExportCSVButton } = CSVExport;
function BTable({
    columns,
    data, 
    sizePerPageList,
    show,
    modalInfo,
    viewId,
    handleClose,
    selectRows
}) {

    const options = {
        totalSize : data.length,
        custom : true,
        sizePerPageList,
        showTotal: true,
    }

    


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
                        <div>
                            
                            <PaginationToolBar paginationProps ={paginationProps} />
                            
                        </div>
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
                                        onlyExportFiltered : true,
                                        exportAll: true
                                    }}
                                    bootstrap4
                                    columnToggle>
                                {(propsToolkit) => {
                                    return (
                                    <div>
                                    <h1>Export all the selected rows</h1>
                                    <ExportCSVButton style={{backgroundColor: 'lightBlue'}} { ...propsToolkit.csvProps }>Export CSV!!</ExportCSVButton>
                                    <hr />
                                        <BootstrapTable
                                        {...propsToolkit.baseProps}
                                        { ...paginationTableProps }
                                        // bootstrap4
                                        filter={ filterFactory()}
                                        classes="table table-head-custom table-vertical-center overflow-hidden"
                                        selectRow = {selectRows}
                                        cellEdit= {cellEditFactory({
                                            mode : 'click',
                                            autoSelectText: true,
                                            blurToSave: true,
                                        })}
                                        >
                                        </BootstrapTable>
                                        {show ? <ModalContent show={show} handleClose={handleClose} modalInfo={modalInfo} data = {data} viewId = {viewId} /> : null}
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