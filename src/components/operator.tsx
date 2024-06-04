import {TbEqualNot,TbEqual} from "react-icons/tb";

function Operator({areSame}) {
    return ( <p className="text-xl">{
        areSame ? <TbEqual />: <TbEqualNot />
        }</p> );
}

export default Operator;