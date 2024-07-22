const getLocation = () => {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        } else {
            reject(new Error('Geolocation is not supported by this browser.'));
        }
    });
};

getLocation().then((position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(position.coords.latitude);
    const url = `/weather?latitude=${latitude}&longitude=${longitude}`;
    fetch(url, {
        method: 'GET'
    })
        .then(response => response.json())
})



