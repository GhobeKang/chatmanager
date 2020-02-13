import React from 'react';

function SearchBox (props) {
    return (
        <div className="search_box_wrap">
            <form method="post">
                <input type="text" name="member_search" placeholder="Search for a member"></input>
            </form>
        </div>
    )
}

export default SearchBox;