import { ThreeDots} from  '/react-loader-spinner'

export default function Loader (){
    return (
        <div  style={{ display:'flex', justifyContent:'center'}}>
        <ThreeDots 
            height="50" 
            width="50" 
            radius="9"
            color="grey"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
            alignSelf = "center"/>
        </div>
    )
}