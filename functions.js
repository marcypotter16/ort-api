


async function getAll(client, collectionName) {
    const result = await client.db("sample_airbnb").collection(collectionName).findOne();
    if (result)
        return result
    else
        return -1
}

async function findOneListingByName(client, nameOfListing) {
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").findOne({ name: nameOfListing });

    if (result) {
        console.log(`Found a listing in the collection with the name '${nameOfListing}':`);
        console.log(result._id, result.name);
    } else {
        console.log(`No listings found with the name '${nameOfListing}'`);
    }
}

async function main(client) {
    
    try {
        await client.connect()
    } catch (error) {
        console.info(error)
    }
    
    await findOneListingByName(client, /Upper West/)
}

module.exports = {
    getAll,
    findOneListingByName,
    main
}