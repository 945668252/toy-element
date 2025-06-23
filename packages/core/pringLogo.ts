export default function () {
  if (PROD) {
    const logo = `
________________________________________________

___________                           .__                                __   
\__    ___/___ ___.__.           ____ |  |   ____   _____   ____   _____/  |_ 
  |    | /  _ <   |  |  ______ _/ __ \|  | _/ __ \ /     \_/ __ \ /    \   __\
  |    |(  <_> )___  | /_____/ \  ___/|  |_\  ___/|  Y Y  \  ___/|   |  \  |  
  |____| \____// ____|          \___  >____/\___  >__|_|  /\___  >___|  /__|  
               \/                   \/          \/      \/     \/     \/      
                                           
________________________________________________
              author:xiecr
`;

    const rainbowGradient = `
background: linear-gradient(135deg, orange 60%, cyan);
background-clip: text;
color: transparent;
font-size: 16px; 
line-height: 1;
font-family: monospace;
font-weight: 600;
`;

    console.info(`%c${logo}`, rainbowGradient);
  } else if (DEV) {
    console.log("[ErUI]:dev mode...");
  }
}
