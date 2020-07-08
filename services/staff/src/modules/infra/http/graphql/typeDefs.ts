const staffTypeDefs = `
  type Staff {
    staffname: String
  }
  type CreateStaffArgument{
    
  }
  type CreateStaffResult{

  }
  extend type Mutation {
    createStaff(input: CreateStaffArgument!): Staff
  }
`;

export { staffTypeDefs };
