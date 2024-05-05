import React from 'react'

const MapBoxSearch = () => {

    const search = new MapboxSearchBox();
search.accessToken = 'pk.eyJ1IjoiYWhzYW4xODI4IiwiYSI6ImNsdmt3anRvaTBwcWkybXBwZ2VrdWdrbTQifQ.AjNjX5ywz7MkS_GSVB2mhg';
map.addControl(search);

  return (
    <div>
        <mapbox-search-box
  access-token="pk.eyJ1IjoiYWhzYW4xODI4IiwiYSI6ImNsdmt3anRvaTBwcWkybXBwZ2VrdWdrbTQifQ.AjNjX5ywz7MkS_GSVB2mhg"
  proximity="0,0"
>
</mapbox-search-box>
    </div>
  )
}

export default MapBoxSearch;
