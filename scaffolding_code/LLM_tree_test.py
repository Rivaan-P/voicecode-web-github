import json

def get_current_branch(input_dataframe): # Prints the current (Most recent) branch, disregarding other branches.
    index = get_largest_index(input_dataframe)
    output = "\n"
    visited = set() 

    while index not in visited:
        visited.add(index)
        output = "User: " + input_dataframe[index]["user"] + "\nAI: " + input_dataframe[index]["ai"] + "\n-=-=-=-=-=-=-\n" + output
        parent_id = input_dataframe[index]["parentID"]
        if parent_id is None:
            break  # Reached the start
        index = next((i for i, msg in enumerate(input_dataframe) if msg["index"] == parent_id and i not in visited), -1)
        if index == -1:
            break  # No valid parent found
    
    return output

def branch(input_dataframe,userInput,AIOutput,branchIndex): #Creates a new branch at the specified index
    input_dataframe.append({"index":get_largest_index(input_dataframe)+1,"user":userInput,"ai":AIOutput,"parentID":branchIndex})

    return input_dataframe

def print_tree_indexes(input_dataframe): #An ugly way to print the indexes of the tree, just for testing.
    output = ""
    current_line = ""
    visited = []
    for each in input_dataframe:    
        for i in range(0,get_largest_index(input_dataframe)):
            if each["parentID"] == input_dataframe[i]["parentID"] and i not in visited:
                current_line += " " + str(i)
                visited.append(i)
        if current_line:
            print(current_line)
        current_line = ""

    return output


def get_largest_index(input_dataframe):
    return len(input_dataframe) - 1



with open("testData1.json") as json_data:
    input = json.load(json_data)
    #print_tree_indexes(input)
    print(get_current_branch(input))