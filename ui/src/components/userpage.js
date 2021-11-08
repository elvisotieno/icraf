import React, { useMemo} from 'react'
import { useTable, usePagination } from 'react-table'
import { COLUMNS } from './Columns'
import './table.css'
const UserPage = ({users}) => {

         //ensure data is not recreated on every rerender
         const columns = useMemo(() => COLUMNS, [])
         const data = useMemo(() => users, [users])
     
         const tableInstance = useTable({
             columns,
             data
         }, usePagination)
    
        const {getTableProps, getTableBodyProps, headerGroups,
             page, nextPage, previousPage, canNextPage, canPreviousPage,
             pageOptions, state, gotoPage, pageCount, prepareRow} = tableInstance
    
        const {pageIndex} = state
        state.pageSize= 20;

    return ( 
        <div className="UserPage">
            <>
        <div className='Report'>
        <table {...getTableProps()}>
            
            <thead >
                {
                    headerGroups.map(headerGroup=>(
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {
                                headerGroup.headers.map(column =>(
                                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                ))
                            }                            
                        </tr>
                    ))
                }                
            </thead>
           
            <tbody {...getTableBodyProps()}>
                {
                    page.map(row =>{
                        prepareRow(row)
                        return(
                            <tr {...row.getRowProps()}>
                                {
                                    row.cells.map( cell =>{
                                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    })
                                }
                                
                            </tr>
                        )
                    })
                }
                
            </tbody>          
            
        </table>
        
        </div>
        <div>
                <span>
                    page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </span>
                <span>
                    | Go to Page: {' '}
                    <input type='number' defaultValue={pageIndex + 1} onChange={e =>{
                        const pageNumber = e.target.value ? Number(e.target.value) -1: 0
                        gotoPage(pageNumber)
                    }}
                    style={{width: '40px'}}></input>
                </span>
                <button onClick={()=>gotoPage(0)} disabled={!canPreviousPage}>{'>>'}</button>
                <button onClick={()=> previousPage()} disabled={!canPreviousPage}>Preious</button>
                <button onClick={()=> nextPage()} disabled={!canNextPage}>Next</button>
                <button onClick={()=>gotoPage(pageCount-1)} disabled={!canNextPage}>{'<<'}</button>
            </div>
        </>

        </div>
    )
}

export default UserPage
