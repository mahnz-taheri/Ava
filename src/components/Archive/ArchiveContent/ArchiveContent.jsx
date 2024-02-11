import { useEffect, useRef, useState } from "react";
import ReactPaginate from "react-paginate";

import {  archiveDummyData, prevSvg, nextSvg,} from "../../../imaginaryDatas/imaginaryArchiveData.jsx";
import EachFile from "./EachFile.jsx";
import '../../../styles/Archive/ArchiveContent/ArchiveContent.css';

const ArchiveContent = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState(archiveDummyData);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [selecteditemid, setselecteditemid] = useState(null);  
  const [itemindex, setitemindex] =useState(0);
  

  //number of pages
  const pageCount = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (selectedPage) => {
    setitemindex(selectedPage.selected);
  };

useEffect(()=>{
  if (selecteditemid!=null)
{  setitemindex(Math.floor(data.findIndex(elem=>elem.id==selecteditemid)/itemsPerPage))}
},[
  itemsPerPage
]);

  // open or close item
  const onItemClick = (itemId) => {
    setselecteditemid(prevstate=>prevstate!=itemId ? itemId :null);
  };
  
  useEffect(()=>{
    if (selecteditemid===null){
      setItemsPerPage(8) 
    }
    else{
      setItemsPerPage(4);
    }
  },[selecteditemid]);

  return (
    <div className="archive-content">
      <div className="files-container">
        {data.slice(itemindex*itemsPerPage,(itemindex+1)*itemsPerPage).map((item, index) => {
          return (
            <EachFile
              key={index}
              files={data}
              setFiles={setData}
              item={item}
              onItemClick={onItemClick}
              isopen={item.id==selecteditemid}
            />
          );
        })}
      </div>
      
      <div className="pagination-container">
        <ReactPaginate
          previousLabel={prevSvg}
          nextLabel={nextSvg}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={1}
          pageRangeDisplayed={3}
          onPageChange={handlePageChange}
          containerClassName={"pagination"}
          activeClassName={"active"}
        /> 
      </div>
    </div>
  );
};

export default ArchiveContent;