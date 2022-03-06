import data from "../data/frontend_developer_practice.json"

export function sectorToType(sector: any): any[] {
    const availableTypes: any = []

    data.projectType_sector.forEach((currItem) => {
        if (currItem.sector === sector) {
            data.projectTypes.forEach((currType) => {
                if (currType.name === currItem.type) {
                    availableTypes.push(currType);
                }
            })
        }
    })

    return availableTypes;
}