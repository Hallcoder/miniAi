import {TbEqualNot,TbEqual} from "react-icons/tb";

function Operator({areSame}) {
    console.log(areSame);
    return ( <p className="text-xl">{
        areSame ? <TbEqual />: <TbEqualNot />
        }</p> );
}

export default Operator;