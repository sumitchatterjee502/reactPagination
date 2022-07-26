import React,{useState, useEffect} from 'react';
import _ from 'lodash';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import PaginationCustom from '../../../Library/Pagination';

import TableWrapper from '../Wrapper/Table/TableWrapper'

const Table = (props)=> {

    const tableList= props.tableList;
    const pageSize = props.pageSize;
    
    const [paginatedPosts, setPaginatedPosts] = useState();
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if(tableList !== ''){
            const firstPageIndex = (currentPage - 1) * pageSize;
            const lastPageIndex = firstPageIndex + pageSize;
            setPaginatedPosts(tableList.slice(firstPageIndex,lastPageIndex)); 
            //setPaginatedPosts(_(tableList).slice(startIndex).take(pageSize).value());       
        }else{
            setPaginatedPosts('')
        }

    }, [tableList, pageSize, currentPage]);

    const totalCount = tableList ? tableList.length : 0 ;
    
    //set batch no
    const setBatchData = (data)=>{
        props.onDataClick(data)
    }

    const policyIssued= (data)=>{
        //console.log(data.length);
        var j = 0 ;
        for(var i =0 ; i<data.length; i++){
            if(data[i].execution_status == 1){
                j++
            }
        }

        return j;
    }

    const alreadyPolicyIssued = (data)=>{
        var j = 0 ;
        for(var i =0 ; i<data.length; i++){
            if(data[i].error_msg == "Already issue"){
                j++
            }
        }

        return j;
    }

    const policyErrors = (data)=>{
        var j = 0 ;
        for(var i =0 ; i<data.length; i++){
            if(data[i].execution_status > 1){
                j++
            }
        }

        return j;
    }

    return (
        <React.Fragment>
            <TableWrapper theader = {props.theader}>
                {
                    !paginatedPosts ? (
                        <tr>
                            <td colSpan={props.theader.length}>
                                <p className ="text-center">No Data Found</p>
                            </td>
                        </tr>
                    ): (
                        <>
                        {
                            paginatedPosts.map((a, index)=>(
                                    <tr key={index}>
                                        <td>
                                            <Link to = {'#'} >
                                                <span onClick={()=> setBatchData(a.batch_no)}>{a.batch_no}</span>
                                            </Link>
                                        </td>
                                        <td>{a.policy_issuance_status.is_merge_status}</td>
                                        <td>{a.total_members}</td>
                                        <td>{policyIssued(a.policy_issuance_rawdata)}</td>
                                        <td>{alreadyPolicyIssued(a.policy_issuance_rawdata)}</td>
                                        <td>{policyErrors(a.policy_issuance_rawdata)}</td>
                                        <td>{a.uploded_time}</td>
                                    </tr>
                                )
                            )
                            
                        }
                        </>
                    )
                }
            </TableWrapper>
            <br/>
            <nav className='d-flex justify-content-center'>

                <PaginationCustom
                    className="pagination-bar"
                    currentPage={currentPage}
                    totalCount={totalCount}
                    pageSize={pageSize}
                    onPageChange={page => setCurrentPage(page)}
                />
            </nav>
        </React.Fragment>
    )
}

export default Table
