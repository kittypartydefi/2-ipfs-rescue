const pinataSDK = require("@pinata/sdk");
const pinata = pinataSDK("xx", "xx");
const IPFSGatewayTools = require("@pinata/ipfs-gateway-tools/dist/node");
const gatewayTools = new IPFSGatewayTools();
const Downloader = require("nodejs-file-downloader");
const Queue = require("async-await-queue");

const hashArray = [""];

const run = async () => {
    await downloadLinks();
//   for await (let hashToPin of hashArray) {
//     await pinata.pinByHash(hashToPin);
//     await delay(200);
//     console.log(hashToPin);
//   }
};

const saveFileBackupOneAtATime = async () => {
  const sourceUrl = "ipfs://" + hashToPin;
  const desiredGatewayPrefix = "https://xxxxx.mypinata.cloud";
  const convertedGatewayUrl = gatewayTools.convertToDesiredGateway(
    sourceUrl,
    desiredGatewayPrefix
  );
  console.log(convertedGatewayUrl);

  const downloader = new Downloader({
    url: convertedGatewayUrl, //If the file name already exists, a new file with the name 200MB1.zip is created.
    directory: "./downloads", //This folder will be created, if it doesn't exist.
    maxAttempts: 3, //Default is 1.
    onProgress: function (percentage, chunk, remainingSize) {
      //Gets called with each chunk.
      console.log("% ", percentage);
      console.log("Current chunk of data: ", chunk);
      console.log("Remaining bytes: ", remainingSize);
    },
  });
  try {
    await downloader.download();

    console.log("All done");
  } catch (error) {
    //IMPORTANT: Handle a possible error. An error is thrown in case of network errors, or status codes of 400 and above.
    //Note that if the maxAttempts is set to higher than 1, the error is thrown only if all attempts fail.
    console.log("Download failed", error);
  }
};

/** Below is a faster download mechanism */
const saveFilesInParallel = async () => {
  //split into chuncks

  const myq = new Queue(10, 200);
  const myPriority = -1;
  //Note check below and modify accordingly to get the array that u want
  //let difference = hashArray.filter(x => !hashAlreadyDownloaded.includes(x));

  const q = [];
  for (let hashToPin of hashArray) {
    const sourceUrl = "ipfs://" + hashToPin;
    const desiredGatewayPrefix = "https://xxxxxx.mypinata.cloud";
    const convertedGatewayUrl = gatewayTools.convertToDesiredGateway(
      sourceUrl,
      desiredGatewayPrefix
    );
    console.log(convertedGatewayUrl);
    q.push(
      myq.run(() =>
        downloadTheKittens(convertedGatewayUrl).catch((e) => console.error(e))
      )
    );
  }
  return Promise.all(q);
};

async function downloadTheKittens(convertedGatewayUrl) {
  const downloader = new Downloader({
    url: convertedGatewayUrl, //If the file name already exists, a new file with the name 200MB1.zip is created.
    directory: "./downloads", //This folder will be created, if it doesn't exist.
    maxAttempts: 3, //Default is 1.
    onProgress: function (percentage, chunk, remainingSize) {
      //Gets called with each chunk.
      console.log("% ", percentage);
      console.log("Current chunk of data: ", chunk);
      console.log("Remaining bytes: ", remainingSize);
    },
  });
  try {
    await downloader.download(); //Downloader.download() returns a promise.

    console.log("All done");
  } catch (error) {
    //IMPORTANT: Handle a possible error. An error is thrown in case of network errors, or status codes of 400 and above.
    //Note that if the maxAttempts is set to higher than 1, the error is thrown only if all attempts fail.
    console.log("Download failed", error);
  }
}

/**
 * Note that in this function one has to save it into a file and process to get the data right
 */
const downloadLinks = async () => {
  const ipfs = await IPFS.create(
    "https://XXXX:YYYYY@ipfs.infura.io:5001/api/v0"
  );

  for (let i = 0; i < 10000; i++) {
    const results = await ipfs.get("QmaASDASDSADASDASDASDASDSA/" + i, {
      compress: false,
    });
    delay(1000);
    for await (let file of results) {
      const data = Buffer.from(file).toString();
      if (data.indexOf("image")) {
        console.log(data);
      }
    }
  }
};

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

run();
