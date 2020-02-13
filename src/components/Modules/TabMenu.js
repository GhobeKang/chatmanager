import React from 'react';

function TabMenu (props) {
    return (
        <div className="tab_wrap">
            <div className="opt_1">
                <p>
                    {props.opt1}
                </p>
            </div>
            <div className="opt_2">
                <p>
                    {props.opt2}
                </p>
            </div>
        </div>
    )
}

export default TabMenu;