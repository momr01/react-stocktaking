export default function date(date) {
    /* FORMA 01

    const fecha = new Date(date)
    const month = fecha.getMonth()+1
    const year = fecha.getFullYear()
    //const day = fecha.getDate()+1
    const day = fecha.getDate()

    const fullDate = `${day}/${month}/${year}`

    //console.log(`${day}/${month}/${year}`)

    console.log(day)

    return fullDate;
    */

    //FORMA 02
    const fecha = date

    const year = fecha.substring(0,4)
    const month = fecha.substring(5,7)
    const day = fecha.substring(8,10)

    const fullDate = `${day}/${month}/${year}`

    //console.log(month)
    return fullDate
}
