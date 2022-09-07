import { PaginationTotalStandalone } from "react-bootstrap-table2-paginator";

function PaginationToolBar(props) {
    const {paginationProps} = props;
    const { sizePerPageList, sizePerPage, totalSize, onSizePerPageChange } = paginationProps;

    const onSizeChange = (event) => {
        const newSize = event.target.value;
        
        onSizePerPageChange(newSize);
    };
    return ( 
        <div>
            <select 
            disabled = {totalSize === 0}
            onChange={onSizeChange} 
            defaultValue ={sizePerPage}>
                {sizePerPageList.map((option) => {
                    const isSelect = sizePerPage === `${option.value}` ;
                    return(
                        <option key ={option.text} value = {option.value} className={`btn ${isSelect ? 'active' : ''}`}>
                            {option.value}
                        </option>
                    )
                })}
            </select>
            <PaginationTotalStandalone className="text-muted" {...paginationProps} />
        </div>
     );
}

export default PaginationToolBar;