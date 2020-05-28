import React from 'react';

interface IProps {
    id: number;
    value: string;
    onClick(): void;
}

export default function Square(props: IProps) {
    return (
        <td id={props.id.toFixed()} className="square-value" onClick={props.onClick}>
            <div>
                {props.value}
            </div>
        </td>
    )
}