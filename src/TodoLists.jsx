import { useEffect, useState } from "react"
import List from "./List"

function TodoLists() {

  return (
    <main className="list-container container-fluid py-4 overflow-auto">
      <div className="row row-cols-1 row-cols-md-3 g-3">
        
        <div className="col"><List /></div>
        <div className="col"><List /></div>
        <div className="col"><List /></div>
        <div className="col"><List /></div>
        <div className="col"><List /></div>
      </div>
    </main>
  );
}

export default TodoLists