# ipfs-rescue

Some kittens names redacted required rescue, their developers motivated by the banking guild had decided to wipe them off the face of the metaverse. Worried, their Kreators called upon the Guardians. The situation was that the developer had threatened to pull of his IPFS links and was not contactable. We wrote a quick script that downloaded the Kittens and pinned them back via pinata and also took backups.

## How it works?
Steps: 

1. Call downloadLinks to get all the metadata jsons from IPFS
2. Using the downloaded links use the loop to pin the files to pinata
3. In pinata create a new gateway, then use that gateway for the next step
4. Using the IPFS pinata gateway download the files as an additional backup
5. Use the parallel download to make it faster

NOTE: you need api keys from pinata and Infura IPFS

That's it folks!