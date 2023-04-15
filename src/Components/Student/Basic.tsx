export default function Basic(props: { user: any}) {
    return (<h1>Hi! {props.user?.uid}</h1>);
}