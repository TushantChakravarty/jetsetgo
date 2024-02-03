export const formatDate = (date:any)=>{
    //console.log('date',date)
    const inputDateTime = new Date(date);
    const hours = inputDateTime.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convert 24-hour format to 12-hour format
    
    const formattedDate = `${inputDateTime.getDate().toString().padStart(2, '0')}-${(inputDateTime.getMonth() + 1).toString().padStart(2, '0')}-${inputDateTime.getFullYear()} ${formattedHours.toString().padStart(2, '0')}:${inputDateTime.getMinutes().toString().padStart(2, '0')} ${ampm}`;
        return formattedDate
}

