
  const useLocalStorage = (key: string) => {
    const setItem = (value: any) => {
        try {
            window.localStorage.setItem(key, JSON.stringify(value))
        } catch (error) {
            console.log("error")
        }
    }
    const getItem = () => {
        try {
           const data = window.localStorage.getItem(key)
           return data ? JSON.parse(data) : undefined
        } catch (error) {
            console.log(error)
        }
    }
    
    const removeItem = (key: string) => {
        try {
            window.localStorage.removeItem(key)
        } catch (error) {
            console.log(error);
        }
    }

    return {setItem, getItem, removeItem}
  }

  export default useLocalStorage;