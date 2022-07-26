# reactPagination
React Pagination component
<pre>
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
</pre>
#=======
<pre>
<PaginationCustom
    className="pagination-bar"
    currentPage={currentPage}
    totalCount={totalCount}
    pageSize={pageSize}
    onPageChange={page => setCurrentPage(page)}
/>

</pre>
