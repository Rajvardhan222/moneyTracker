export function getMonthRange(fromDate, toDate) {
    const result = [];
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  
    let currentDate = new Date(toDate);
    const fromYear = fromDate.getFullYear();
    const fromMonth = fromDate.getMonth();
    
    while (currentDate.getFullYear() > fromYear || 
           (currentDate.getFullYear() === fromYear && currentDate.getMonth() >= fromMonth)) {
      const month = months[currentDate.getMonth()];
      result.push(month);
  
      // Move to the previous month
      currentDate.setMonth(currentDate.getMonth() - 1);
    }
  
    return result;
  }
