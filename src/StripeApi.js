import React from 'react';

export function withStripe(WrappedComponent, publicKey, secretKey) {
    const request = async (route, key, method, postData) => {
        let dataStr;
        if (postData) {
            dataStr = Object.keys(postData).map(k => {
                return `${k}=${postData[k]}`
            }).join("&")
        }
        let response;
        try {
            response = await fetch('https://api.stripe.com/v1/' + route, {
                method: method,
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${key}`,
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: dataStr
            })
            if (response.ok) {
                return await response.json();
            } else {
                return await response;
                throw new Error(response);
            }
        } catch (e) {
        }
    }

    return class extends React.Component {
        publicPost(route, postData) {
            return request(route, publicKey, 'POST', postData)

        }
        postSecret(route, postData) {
            return request(route, secretKey, 'POST', postData)
        }

        getSecret(route, postData) {
            return request(route, secretKey, 'GET', null)
        }

        render() {
            return <WrappedComponent
                publicPost={this.publicPost}
                postSecret={this.postSecret}
                getSecret={this.getSecret}
                publicKey = {publicKey}
                {...this.props}

            />
        }
    }
}