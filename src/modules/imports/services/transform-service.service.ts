import { BR_STATES } from '@/modules/common/shared/constants/br-states.constant';
import { AddressRepository } from '@/modules/professional-profiles/address/repositories/address.repository';
import { Injectable } from '@nestjs/common';
import { config } from 'dotenv'
import { LinkedinProfile, ExperienceModel, FormationModel, OfficeModel, TagModel, ProfileModel } from '../models/linkedin-profile.model';

config()

@Injectable()
export class TransfromService {
    constructor(private readonly addressRepository: AddressRepository) { }

    async transformDataTypeOne(rawProfile: LinkedinProfile): Promise<ProfileModel> {
        const experiences = rawProfile.experiences.map((exp): ExperienceModel => {
            const offices: OfficeModel[] = exp.offices.map((office): OfficeModel => {
                const initialData = office.duration?.split(" - ")[0];
                let endData = office.duration?.split(" - ")[1]?.split(" · ")[0];
                const duration = office.duration?.split(" - ")[1]?.split(" · ")[1];
                if (endData === "Present") {
                    endData = "";
                }
                return {
                    description: office.description,
                    name: office.name ? office.name : "Não informado",
                    location: office.location,
                    duration: duration,
                    current_position: office.name ? office.name : "Não informado",
                    end_date: endData ? endData : "Não informado",
                    initial_date: initialData ? initialData : "Não informado",
                };
            });

            let officeEndDate = offices[0].end_date;
            if (officeEndDate === "Present") {
                officeEndDate = "";
            }

            return {
                company: exp.title ? exp.title : "Não informado",
                current_position: offices[0].end_date ? "false" : "true",
                end_date: officeEndDate,
                initial_date: offices[offices.length - 1].initial_date,
                offices,
                position: offices[0].current_position,
            };
        });

        const formations: FormationModel[] = rawProfile.education.map((e): FormationModel => {
            const initialDate = e.period.split(" - ")[0];
            let endDate = e.period.split(" - ")[1];
            if (endDate === "Present") {
                endDate = "";
            }
            return {
                course: e.course ? e.course : "Não informado",
                end_date: endDate,
                initial_date: initialDate,
                institution: e.title ? e.title : "Não informado",
            };
        });
        let tags: TagModel[] = [];
        if (rawProfile.skills) {
            tags = rawProfile.skills?.map((sk): TagModel => {
                return {
                    name: sk.skill,
                };
            });
        }

        const cityState = rawProfile.location?.split(",");
        let city = "";
        let state = "";
        if (cityState) {
            city = cityState[0];
            state = cityState[1];
        }
        if (!city && !state) {
            if (experiences[0] && experiences[0].offices && experiences[0].offices[0]) {
                const location = experiences[0].offices[0].location;
                const cityState = location.split(",");
                city = cityState[0];
                state = cityState[1];
            }
        }

        city = city?.trimStart();

        let result = BR_STATES.find((st) => st.name === state?.trimStart());
        let address_id = null

        if (result) {
            state = result.initials
            let address = await this.addressRepository.findOne({
                where: {
                    city: city,
                    state: state
                }
            })
            if (address) {
                address_id = address.id
            }
            else if (!address) {
                const new_address = await this.addressRepository.create({
                    city: city,
                    state: state,
                })
                address_id = (await this.addressRepository.save(new_address)).id
            }
        }
        else if (!result) {
            state = state?.trimStart()
        }
        const profileModel: ProfileModel = {
            name: rawProfile.name.trimEnd(),
            professional_about: rawProfile.about,
            professional_title: rawProfile.description ? rawProfile.description : "Não informado",
            city,
            state,
            address_id,
            experiences,
            formations,
            photo_url: rawProfile.profileImage ? process.env.IMAGE_ENDPOINT + rawProfile.profileImage : '',
            tag_names: tags.map((t) => t.name),
            clt_claim: null,
            pj_claim: null,
            tags: [],
        };
        return profileModel;
    }
}